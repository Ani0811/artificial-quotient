import { NextResponse } from "next/server";
import { writeFile, readdir, stat, unlink, mkdir } from "fs/promises";
import path from "path";
import { verifyAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg"]);
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "image/svg+xml",
]);
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

async function ensureUploadsDir() {
  try {
    await mkdir(UPLOADS_DIR, { recursive: true });
  } catch {
    // Directory already exists or error
  }
}

// GET: List all uploaded files (requires authenticated session)
export async function GET() {
  const auth = await verifyAdminSession(undefined, true);
  if (!auth.isAuthenticated || auth.errorResponse) {
    return NextResponse.json(
      { success: false, message: auth.errorResponse?.message || "Unauthorized" },
      { status: auth.errorResponse?.status || 401 }
    );
  }

  try {
    await ensureUploadsDir();
    const filenames = await readdir(UPLOADS_DIR);

    const files = await Promise.all(
      filenames.map(async (name) => {
        const filePath = path.join(UPLOADS_DIR, name);
        const fileStat = await stat(filePath);
        return {
          id: name,
          name,
          url: `/uploads/${name}`,
          size: fileStat.size,
          createdAt: fileStat.birthtime.toISOString(),
          isImage: /\.(jpg|jpeg|png|gif|webp|svg|avif)$/i.test(name),
        };
      })
    );

    files.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ success: true, files });
  } catch {
    return NextResponse.json({ success: true, files: [] });
  }
}

// POST: Upload one or more files (requires admin write permission)
export async function POST(request: Request) {
  const auth = await verifyAdminSession(undefined, false);
  if (!auth.isAuthenticated || auth.errorResponse) {
    return NextResponse.json(
      { success: false, message: auth.errorResponse?.message || "Unauthorized" },
      { status: auth.errorResponse?.status || 401 }
    );
  }

  try {
    await ensureUploadsDir();

    const formData = await request.formData();
    const uploadedFiles: any[] = [];
    const fileEntries = formData.getAll("file");

    if (!fileEntries || fileEntries.length === 0) {
      return NextResponse.json(
        { success: false, message: "No files provided for upload." },
        { status: 400 }
      );
    }

    for (const entry of fileEntries) {
      if (typeof entry === "object" && "arrayBuffer" in entry) {
        const file = entry as File;

        // 1. File size validation
        if (file.size > MAX_FILE_SIZE) {
          return NextResponse.json(
            { success: false, message: `File '${file.name}' exceeds the 10MB upload limit.` },
            { status: 400 }
          );
        }

        // 2. Extension & MIME type validation
        const ext = path.extname(file.name).toLowerCase();
        const mime = file.type.toLowerCase();

        if (!ALLOWED_EXTENSIONS.has(ext) || (!ALLOWED_MIME_TYPES.has(mime) && !mime.startsWith("image/"))) {
          return NextResponse.json(
            { success: false, message: `File type '${ext}' is not allowed. Only valid image formats (PNG, JPG, WebP, GIF, SVG, AVIF) are supported.` },
            { status: 400 }
          );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // 3. Strict filename sanitization
        const baseNameOnly = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
        const uniqueFilename = `${Date.now()}_${baseNameOnly}${ext}`;
        const filePath = path.join(UPLOADS_DIR, uniqueFilename);

        await writeFile(filePath, buffer);

        uploadedFiles.push({
          id: uniqueFilename,
          name: file.name,
          url: `/uploads/${uniqueFilename}`,
          size: file.size,
          type: file.type,
          createdAt: new Date().toISOString(),
          isImage: true,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `${uploadedFiles.length} file(s) uploaded successfully!`,
      files: uploadedFiles,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload file(s)." },
      { status: 500 }
    );
  }
}

// DELETE: Delete a file by filename (requires admin write permission)
export async function DELETE(request: Request) {
  const auth = await verifyAdminSession(undefined, false);
  if (!auth.isAuthenticated || auth.errorResponse) {
    return NextResponse.json(
      { success: false, message: auth.errorResponse?.message || "Unauthorized" },
      { status: auth.errorResponse?.status || 401 }
    );
  }

  try {
    const { filename } = await request.json();
    if (!filename || typeof filename !== "string") {
      return NextResponse.json(
        { success: false, message: "Valid filename required." },
        { status: 400 }
      );
    }

    const safeBasename = path.basename(filename);
    const ext = path.extname(safeBasename).toLowerCase();

    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { success: false, message: "Invalid file target." },
        { status: 400 }
      );
    }

    const filePath = path.join(UPLOADS_DIR, safeBasename);
    await unlink(filePath);

    return NextResponse.json({
      success: true,
      message: "File deleted successfully.",
    });
  } catch (error: any) {
    console.error("Delete upload error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete file." },
      { status: 500 }
    );
  }
}
