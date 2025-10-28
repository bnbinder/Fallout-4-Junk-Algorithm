import { locale } from './fallout4.js';

let locationNames: Map<string, number> = new Map();

export const runOnceHashMap = () => {
  for (var i = 0; i < locale.en.markerData.length; i++) {
    locationNames.set(locale.en.markerData[i].title.toLowerCase(), i);
  }
}

interface ParseResponse {
  parse: {
    title: string;
    text: {
      '*': string;
    };
  };
}

interface ResponseResult {
  title: string;
  section: string;
  places: string[];
  sectionNumber?: string;
}

interface ErrorResult {
  error: string;
}

type Response = ResponseResult | ErrorResult;

function isError(result: Response): result is ErrorResult {
  return 'error' in result;
}

export async function getProductionSection(articleTitle: string): Promise<Response> {
  console.log(articleTitle)
  const url = `https://fallout.fandom.com/api.php?` +
    `action=parse&` +
    `page=${encodeURIComponent(articleTitle)}&` +
    `prop=text&` +
    `format=json&` +
    `origin=*`;

  try {
    const response = await fetch(url);
    const data: ParseResponse = await response.json();
    const htmlContent = data.parse.text['*'];

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    const headings = doc.querySelectorAll<HTMLHeadingElement>('h2, h3');
    let productionHeading: HTMLHeadingElement | null = null;

    for (const heading of headings) {
      const spanId = heading.querySelector('span')?.id || '';
      if (spanId === 'Production' || heading.textContent?.includes('Production')) {
        productionHeading = heading;
        break;
      }
    }

    if (!productionHeading) {
      return { error: 'Production section not found' };
    }

    const productionItems: string[] = [];
    let currentElement = productionHeading.nextElementSibling?.nextElementSibling;

    while (currentElement) {
      if (currentElement.tagName === 'TABLE') {
        const tbody = currentElement.querySelector<HTMLTableSectionElement>('tbody');
        if (tbody) {
          const listItems = tbody.querySelectorAll<HTMLTableRowElement>('tr');
          listItems.forEach(tr => {
            const text = tr.querySelectorAll<HTMLTableCellElement>('td');
            text.forEach(a => {
              const div = a.querySelector('div');
              if (div && div.querySelector('a') &&
                div.classList.contains("np-crafting-block") &&
                div.classList.length == 1) {
                const text = div.querySelector('a')?.getAttribute('title')?.replace("(Fallout 4)", "");
                console.log(text)
                if (text) productionItems.push(text);
              }
              else if (!div && a.querySelector('a')) {
                 productionItems.push(a.querySelector('a')?.getAttribute('title')?.replace("(Fallout 4)", "") ?? '');
              }
            });
          });
        }
      }
      currentElement = currentElement.previousElementSibling;
    }

    return {
      title: articleTitle,
      section: 'Locations',
      places: productionItems
    };

  } catch (error) {
    console.error('Error fetching productions:', error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getLocationsSection(articleTitle: string): Promise<Response> {
  const url = `https://fallout.fandom.com/api.php?` +
    `action=parse&` +
    `page=${encodeURIComponent(articleTitle)}&` +
    `prop=text&` +
    `format=json&` +
    `origin=*`;

  try {
    const response = await fetch(url);
    const data: ParseResponse = await response.json();
    const htmlContent = data.parse.text['*'];

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    const headings = doc.querySelectorAll<HTMLHeadingElement>('h2, h3');
    let locationsHeading: HTMLHeadingElement | null = null;

    for (const heading of headings) {
      const spanId = heading.querySelector('span')?.id || '';
      if (spanId === 'Locations' || heading.textContent?.includes('Locations')) {
        locationsHeading = heading;
        break;
      }
    }

    if (!locationsHeading) {
      return { error: 'Location section not found' };
    }

    const locationsItems: string[] = [];
    let currentElement = locationsHeading.nextElementSibling;

    while (currentElement && !['H2', 'H3'].includes(currentElement.tagName)) {
      if (currentElement.tagName === 'UL') {
        const listItems = currentElement.querySelectorAll<HTMLElement>('li');
        if (listItems) {
          listItems.forEach(li => {
            const text = li.querySelectorAll('a');
            var seentwotime :  Map<string, string> = new Map();
            text.forEach(element => {
              if (element) 
                var tempp
                tempp = element.title.replace("(Fallout 4)", "").trim();
                if(locationNames.has(tempp.toLowerCase()) && !seentwotime.has(tempp)) {
                  locationsItems.push(tempp);
                  seentwotime.set(tempp, "")
                }
            });
          });
        }
      }
      currentElement = currentElement.nextElementSibling;
    }
    console.log(locationsItems);
    return {
      title: articleTitle,
      section: 'Locations',
      places: locationsItems
    };

  } catch (error) {
    console.error('Error fetching locations:', error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


export function format(result: Response): string[] {
  if (isError(result)) {
    console.error(`Error: ${result.error}`);
    return [];
  }

  var nameArr: string[]
  nameArr = []
  result.places.forEach((place) => {
    nameArr.push(place)
  });

  return nameArr;
}
