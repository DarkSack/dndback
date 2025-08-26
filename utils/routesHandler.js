import indexRouter from "../routes/index.js";
import usersRouter from "../routes/users.js";
import loginRouter from "../routes/auth/login.js";
import registerRouter from "../routes/auth/register.js";
import createHeroRouter from "../routes/characters/createHero.js";
import summonHeroRouter from "../routes/characters/summonHero.js";
import createHistoryRouter from "../routes/histories/createHistory.js";
import continueHistoryRouter from "../routes/histories/continueHistory.js";
import createRoomRouter from "../routes/room/createRoom.js";
import improveFieldRouter from "../routes/extras/inproveField.js";
const routes = [
  { path: "/", handler: indexRouter },
  { path: "/users", handler: usersRouter },
  { path: "/auth/login", handler: loginRouter },
  { path: "/auth/register", handler: registerRouter },
  { path: "/characters/create", handler: createHeroRouter },
  { path: "/characters/summon", handler: summonHeroRouter },
  { path: "/histories/create", handler: createHistoryRouter },
  { path: "/histories/continue", handler: continueHistoryRouter },
  { path: "/room/create", handler: createRoomRouter },
  { path: "/extras/inproveField", handler: improveFieldRouter },
];

export default routes;
