import s from "./Homepage.module.css";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import DealItem from "../DealItem/DealItem";

function Homepage() {
  const deals = useSelector((store) => store.deals.data);

  return (
    <>
      <Header />
      <div className={s.homepage}>
        <div className={s.overlay}></div>
        <div className={s.text}>
          <div className={s.header}>The chemical negatively charged</div>
          <div className={s.info}>
            Numerous calculations predict, and experiments confirm, that the
            force field reflects the beam, while the mass defect is not formed.
            The chemical compound is negatively charged. Twhile the mass defect
            is
          </div>
          <div className={s.btn}>Get Started</div>
        </div>
      </div>
      <div className={s.deals}>
        <div className={s.header}>Open Deals</div>
        <div className={s.container}>
          {deals.map((deal) => (
            <DealItem key={deal.name} deal={deal} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Homepage;
