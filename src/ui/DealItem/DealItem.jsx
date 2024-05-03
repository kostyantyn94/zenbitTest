import s from "./DealItem.module.css";
import PropTypes from "prop-types";

function DealItem({ deal }) {
  const { name, price, tiket, yield: y, days, sold, img } = deal;
  return (
    <div className={s.item} style={{ backgroundImage: `url(${img})` }}>
      <div className={s.info}>
        <div className={s.name}>{name}</div>
        <div className={s.grid}>
          <span>{price} Dhs</span>
          <span>Yield {y}%</span>
          <span>Sold {sold}%</span>
          <span>Tiket – {tiket} Dhs</span>
          <span>Days left {days}</span>
        </div>
      </div>
    </div>
  );
}

DealItem.propTypes = {
  deal: PropTypes.object,
};

export default DealItem;
