import NavBar from "../components/header";
import AddItem from "../components/AddItems/AddItem";
import "../style/additem.css";

export default function ItemPage() {
  return (
    <>
      <NavBar />
      <div className="item-container">
        <AddItem />
      </div>
    </>
  );
}
