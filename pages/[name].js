import { useRouter } from 'next/router'
const cheerio = require('cheerio')

const Concept = (props) => {
    const { isFallback } = useRouter();
    return (
        <div className="infobox p-6 mt-10 max-w-lg mx-auto bg-white rounded-xl shadow-md  items-center space-x-4" 
            dangerouslySetInnerHTML={{ __html: props.infobox }} />
    );
}

export async function getStaticProps({params}) {

    const res = await fetch(`https://en.wikipedia.org/wiki/${params.name}`)
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