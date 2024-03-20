import { startServerAndCreateH3Handler } from "@as-integrations/h3";
import { getCurrentUser } from "../handlers/auths/auth.handlers";
import apollo from "../configs/apollo";

export default startServerAndCreateH3Handler(apollo, {
    context: (event) => {
        const bearerToken = event.event.headers.get("authorization");

        if (!bearerToken) {
            return null;
        }

        const token = bearerToken.replace("Bearer ", "");

        const user = getCurrentUser({ token });

        if (!user) {
            return null;
        }

        return { user };
    },
});
