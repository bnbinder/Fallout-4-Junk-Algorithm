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
                
                const resultList = document.getElementById('results') as HTMLSelectElement;
                resultList.innerHTML = "";
                for (const element of list) {
                    console.log(element)
                    let result = await getLocationsSection(element + ' (Fallout 4)');
                    if ("error" in result)
                        console.log("true")
                        result = await getLocationsSection(element);
                    bigList = format(result);
                    bigList.forEach(bigElement => {
                        biggestList.push(bigElement)
                    });
                }

                showAll()
                const hashbrown = filterMaps(biggestList)
                hashbrown.forEach((index, item) => {
                    const newItem = document.createElement('li');
                    newItem.textContent = item;
                    resultList.appendChild(newItem);
                })
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