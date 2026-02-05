const trimTrailingSlash = (value: string) => value.replace(/\/$/, "")

export const getPublicPath = (assetPath: string) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH
    ? trimTrailingSlash(process.env.NEXT_PUBLIC_BASE_PATH)
    : ""

  return `${basePath}${assetPath.startsWith("/") ? "" : "/"}${assetPath}`
}
