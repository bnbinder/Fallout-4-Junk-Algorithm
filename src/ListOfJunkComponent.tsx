import 'leaflet/dist/leaflet.css';
import { getProductionSection, getLocationsSection, format } from "./APICall.tsx";
import { filterMaps, showAll } from './MapComponent.tsx';
function ListOfJunkComponent() {

    async function submitSelect() {
            const dropdown = document.getElementById("dropdown") as HTMLSelectElement;
            if(dropdown) {
                const selected = dropdown.options[dropdown.selectedIndex].text
                var list : string[] = [];
                var bigList : string[] = [];
                var biggestList : string[] = [];
                
                const result = await getProductionSection(selected + ' (Fallout 4)');
                list = format(result);

                console.log(list);
                
                const resultList = document.getElementById('results') as HTMLSelectElement;
                resultList.innerHTML = "";
                for (const element of list) {
                    const result = await getLocationsSection(element + ' (Fallout 4)');
                    bigList = format(result);
                    console.log(bigList)
                    bigList.forEach(bigElement => {
                        biggestList.push(bigElement)
                        const newItem = document.createElement('li');
                        newItem.textContent = bigElement;
                        resultList.appendChild(newItem);
                    });
                }
                showAll()
                filterMaps(biggestList)
            }
    };
        
    const junk = [
    "Acid",
    "Adhesive",
    "Aluminum",
    "Antiseptic",
    "Asbestos",
    "Ballistic fiber",
    "Bone",
    "Ceramic",
    "Circuitry",
    "Cloth",
    "Concrete",
    "Copper",
    "Cork",
    "Crystal",
    "Fertilizer",
    "Fiber optics",
    "Fiberglass",
    "Gears",
    "Glass",
    "Gold",
    "Lead",
    "Leather",
    "Nuclear material",
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
            <br/>
            <button onClick={showAll}>
                showall
            </button>
            <ul id = "results">

            </ul>
        </div>
    );
}

export default ListOfJunkComponent;