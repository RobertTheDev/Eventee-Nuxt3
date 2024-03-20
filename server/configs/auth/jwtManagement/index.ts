import jwt from "jsonwebtoken";

export function jwtSign(params: { userId: string }) {
    return jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: {
                userId: params.userId,
            },
        },
        process.env.JWT_SECRET as string,
    );
}

export function jwtVerify(params: { token: string }) {
    return jwt.verify(params.token, process.env.JWT_SECRET as string);
}
