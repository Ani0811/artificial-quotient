import { NextResponse } from "next/server";
import { writeFile, readdir, stat, unlink, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

// Helper to ensure uploads directory exists
async function ensureUploadsDir() {
  try {
    await mkdir(UPLOADS_DIR, { recursive: true });
  } catch {
    // Directory already exists or error
  }
}

// GET: List all uploaded files
export async function GET() {
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

    // Sort newest first
    files.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ success: true, files });
  } catch {
    return NextResponse.json({ success: true, files: [] });
  }
}

// POST: Upload one or more files
export async function POST(request: Request) {
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
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize filename and append unique timestamp
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const uniqueFilename = `${Date.now()}_${sanitizedName}`;
        const filePath = path.join(UPLOADS_DIR, uniqueFilename);

        await writeFile(filePath, buffer);

        uploadedFiles.push({
          id: uniqueFilename,
          name: file.name,
          url: `/uploads/${uniqueFilename}`,
          size: file.size,
          type: file.type,
          createdAt: new Date().toISOString(),
          isImage: /\.(jpg|jpeg|png|gif|webp|svg|avif)$/i.test(file.name) || file.type.startsWith("image/"),
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `${uploadedFiles.length} file(s) uploaded successfully!`,
      files: uploadedFiles,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to upload file(s)." },
      { status: 500 }
    );
  }
}

// DELETE: Delete a file by filename
export async function DELETE(request: Request) {
  try {
    const { filename } = await request.json();
    if (!filename) {
      return NextResponse.json(
        { success: false, message: "Filename required." },
        { status: 400 }
      );
    }

    const filePath = path.join(UPLOADS_DIR, path.basename(filename));
    await unlink(filePath);

    return NextResponse.json({
      success: true,
      message: "File deleted successfully.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to delete file." },
      { status: 500 }
    );
  }
}
