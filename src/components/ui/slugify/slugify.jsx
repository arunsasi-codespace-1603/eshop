const slugify = (string) => {
    return string
        .toLowerCase()
        .trim()
        .replace(/['"]/g, "")        // Remove quotes
        .replace(/[^a-z0-9]+/g, "-") // Replace spaces & special chars with -
        .replace(/^-+|-+$/g, "");    // Remove leading/trailing hyphens
}
export default slugify