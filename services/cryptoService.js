import crypto from "crypto";

const SECRET = process.env.SECRET_KEY || "dev-key";
const ALGO = "aes-256-cbc";
const KEY = crypto.createHash("sha256").update(SECRET).digest();
const IV = Buffer.alloc(16, 0);

export function encrypt(data) {
  const cipher = crypto.createCipheriv(ALGO, KEY, IV);
  let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}
