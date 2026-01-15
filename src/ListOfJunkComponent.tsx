import 'leaflet/dist/leaflet.css';
import { getProductionSection, getLocationsSection, format } from "./APICall.tsx";
import { filterMaps, showAll } from './MapComponent.tsx';
import junkData from "./junkData.json";
function ListOfJunkComponent() {

    const jsonData: Record<string, Record<string, string[]>> = junkData;

    async function getJunkAndComponentData(selected: string) {
        var list: string[] = [];
        var bigList: string[] = [];
        var biggestList: Map<string, string[]> = new Map();

        const result = await getProductionSection(selected + ' (Fallout 4)');
        list = format(result);

        const resultList = document.getElementById('results') as HTMLSelectElement;
        resultList.innerHTML = "";
        for (const element of list) {
            let result = await getLocationsSection(element + ' (Fallout 4)');
            if ("error" in result) {
                result = await getLocationsSection(element);
            }
            bigList = format(result);
            biggestList.set(element, bigList)
        }
        return biggestList;
    }

    function getAllJunkPromise() {
        const promises: Promise<Map<string, string[]>>[] = [];
        junk.forEach(item => {
            promises.push(getJunkAndComponentData(item));
        });
        return Promise.all(promises);
    }

    async function goThroughAll() {
        const data = new Map<string, Map<string, string[]>>();
        const dataAll = await getAllJunkPromise();
        junk.forEach((item, index) => {
            data.set(item, dataAll[index]);
        });

        console.log(data)

        let dataString = JSON.stringify(Object.fromEntries(
            Array.from(data.entries()).map(([key, value]) => [
                key,
                Object.fromEntries(value),
            ])
        ))

        console.log(dataString)
        const blob = new Blob([dataString], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "data.json";

        link.click();
        URL.revokeObjectURL(url);
    }

    async function submitSelect() {
        const dropdown = document.getElementById("dropdown") as HTMLSelectElement;
        if (dropdown) {
            const selected = dropdown.options[dropdown.selectedIndex].text
            const sel = jsonData[selected]
            var biggestList: string[] = [];
            
            Object.entries(sel).forEach(([key, value]) => {
                value.forEach(item => {
                    if (!biggestList.includes(item))
                        biggestList.push(item)
                });
            });
            /*var list: string[] = [];
            var bigList: string[] = [];
            var biggestList: string[] = [];

            const result = await getProductionSection(selected + ' (Fallout 4)');
            list = format(result);
            */
            const resultList = document.getElementById('results') as HTMLSelectElement;
            resultList.innerHTML = "";
            /*
            for (const element of list) {
                console.log(element)
                let result = await getLocationsSection(element + ' (Fallout 4)');
                if ("error" in result) {
                    console.log("true")
                    result = await getLocationsSection(element);
                }
                bigList = format(result);
                bigList.forEach(bigElement => {
                    biggestList.push(bigElement)
                });
            }*/

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
            <select id="dropdown">
                {junk.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
            </select>
            <br />
            <button onClick={submitSelect}>
                Find Optimal Path From Selected Location
            </button>
            <br />
            <button onClick={showAll}>
                show all
            </button>
            <button onClick={goThroughAll}>
                go through all
            </button>
            <ul id="results">

            </ul>
        </div>
    );
}

export default ListOfJunkComponent;