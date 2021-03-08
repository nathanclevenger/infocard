import { useRouter } from 'next/router'
const cheerio = require('cheerio')

const Concept = (props) => {
    const { isFallback } = useRouter();
    return (
        <table className="infobox vcard p-6 m-10 max-w-lg mx-auto bg-white rounded-xl shadow-md  items-center space-x-4" 
            dangerouslySetInnerHTML={{ __html: props.infobox }} />
    );
}

export async function getStaticProps({params}) {

    const res = await fetch(`https://en.wikipedia.org/wiki/${params.name}`, {
        headers: {
            'Host': 'en.wikipedia.org',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
            'accept-language': 'en-us',
            'referer': 'https://en.wikipedia.org/',
        }
    })
    //console.log (await res.text());
    const $ = cheerio.load(await res.text())

    const infobox = $('table.infobox').first().html().replaceAll('/wiki/','/');

    console.log(infobox);

    return {
      props: {infobox}, // will be passed to the page component as props
      revalidate: 30 * 24 * 60 * 60
    }
}

export async function getStaticPaths() {
    return { paths: [], fallback: true }
}
 
export default Concept;