import { CrewProps } from "../../../interfaces";

const data: CrewProps[] = [];

for (let i = 0; i < 10; i++) {
  const par = i % 2 === 0;
  data.push({
    adult: false,
    gender: i,
    id: i,
    known_for_department: `known for department - ${i}`,
    name: `name - ${i}`,
    original_name: `original name - ${i}`,
    popularity: i,
    profile_path: `image - ${i}`,
    credit_id: `${i}`,
    department: `department - ${i}`,
    //@ts-ignore
    job: par ? `job - ${i}` : undefined,
    cast_id: i,
    character: `character - ${i}`,
    order: i,
  });
}

export default data;
