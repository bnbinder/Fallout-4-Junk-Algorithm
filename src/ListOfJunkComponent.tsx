import 'leaflet/dist/leaflet.css';
import { getLocationsSection, formatLocations } from "./api.tsx";
function ListOfJunkComponent() {

    function submitSelect() {
            const dropdown = document.getElementById("dropdown") as HTMLSelectElement;
            if(dropdown)
            {
                const selected = dropdown.options[dropdown.selectedIndex].text
                alert(getLocationsSection(selected + ' (Fallout 4)').then(result => {
                    formatLocations(result);
                }));
            }
        }
        
    const junk = [
    "Acid",
    "Adhesive",
    "Aluminum",
    "Antiseptic",
    "Asbestos",
    "Ballistic Fiber",
    "Bone",
    "Ceramic",
    "Circuitry",
    "Cloth",
    "Concrete",
    "Copper",
    "Cork",
    "Crystal",
    "Fertilizer",
    "Fiber Optics",
    "Fiberglass",
    "Gears",
    "Glass",
    "Gold",
    "Lead",
    "Leather",
    "Nuclear Material",
    "Oil",
    "Plastic",
    "Rubber",
    "Screw",
    "Silver",
    "Spring",
    "Steel",
    "Wood"]

    return (
        <div>
            <select id = "dropdown">
                {junk.map((item, index) => (
                    <option key = {index} value = {item}>{item}</option>
                ))}
            </select>
            <br/>
            <button onClick={submitSelect}>
                Find Optimal Path From Selected Location
            </button>
        </div>
    );
}

export default ListOfJunkComponent;