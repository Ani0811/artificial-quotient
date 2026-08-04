let currentAdminPassword = process.env.ADMIN_PASSWORD || "admin123";

export function getAdminPassword(): string {
  return currentAdminPassword;
}

export function setAdminPassword(newPassword: string): void {
  currentAdminPassword = newPassword;
}
