import { CadesHero } from "@/components/Projects/CadesHero";
import { CadesSescDivider } from "@/components/Projects/Divider";

import { Footer } from "@/components/Projects/Footer";

const page = () => {
  return (
    <div>
      <CadesHero />

      {/* <CadesAbout /> */}
      {/* <CadesProjects />
      <Impact />*/}
      <CadesSescDivider color={"bg-gray-900"} />
      <Footer />
    </div>
  );
};

export default page;
