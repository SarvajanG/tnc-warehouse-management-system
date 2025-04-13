import HomeButton from "../components/HomeButton";
import Settings from "../components/Settings";
import Container from "../components/Container";
import ItemContainer from "../components/ItemContainer";

export default function Inventory() {
  return (
    <Container>
      <HomeButton />
      <ItemContainer></ItemContainer>
      <Settings />
    </Container>
  );
}
