import { User } from "./User";
import { Company } from "./Company";
import { CustomMap } from "./CustomMap";

const map = new CustomMap("map");
const user = new User();
console.log(user);

const company = new Company();
console.log(company);

map.addMarker(user);
map.addMarker(company);
