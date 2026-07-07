const cookiesoptions={
    httpOnly:true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 10 * 24 * 60 * 60 * 1000 // 10 days
}
export default cookiesoptions