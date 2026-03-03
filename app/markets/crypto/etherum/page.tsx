import { AccordionDemo } from "@/components/chad/Accordion";
import Image from "next/image";
import forexGuy from '@/assets/etherum.jpg'

const items = [
  {
    title: "Why should I invest in Ethereum?",
    subTitle: "Ethereum is the backbone of decentralized finance (DeFi) and blockchain applications. Its continued adoption and technological advancements, like the Ethereum 2.0 upgrade, make it a strong long-term investment with significant growth potential."
  },
  {
    title: "How does CAP VENTURES help me invest in Ethereum?",
    subTitle: "CAP VENTURES simplifies Ethereum investment by providing a secure and user-friendly platform. We offer expert insights, risk management strategies, and diversified investment options to help maximize returns while minimizing volatility."
  },
  {
    title: "Is Ethereum a safe investment?",
    subTitle: "While Ethereum is a volatile asset like all cryptocurrencies, its strong use cases and widespread adoption make it one of the more stable digital assets. With proper risk management, it can be a valuable addition to an investment portfolio."
  },
  {
    title: "Can I earn passive income from Ethereum?",
    subTitle: "Yes! Ethereum staking allows investors to earn rewards by participating in network validation. CAP VENTURES provides opportunities for Ethereum staking, enabling passive income while holding your investment."
  },
  {
    title: "What is the future outlook for Ethereum?",
    subTitle: "Ethereum’s transition to Ethereum 2.0 improves scalability, security, and sustainability, making it a promising asset for long-term growth. Its role in DeFi, NFTs, and smart contracts ensures continued demand and innovation."
  }
];


export default function EtherumPage  () {
  return (
    <div>

      {/* about forx */}
       <div className="w-full md:w-11/12 lg:w-10/12 mx-auto p-4 sm:p-6 md:py-12 space-y-8">
         <h2 className="text-3xl md:text-4xl font-medium text-neutral-800 text-center">Tap into the Future of Digital Finance with Ethereum</h2>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className=" flex flex-col">
             <p>
               {`Ethereum is more than just a cryptocurrency—it’s a decentralized platform powering smart contracts, decentralized finance (DeFi), and blockchain-based applications. Investing in Ethereum offers exposure to one of the most innovative and rapidly growing digital assets in the world. At CAP VENTURES, we simplify Ethereum investment, ensuring seamless access to this high-potential asset while offering expert insights and risk management strategies.`}
             </p>
             <br />
             <p>
               {`With its widespread adoption and continuous technological upgrades, Ethereum remains a valuable long-term investment. CAP VENTURES provides a secure and user-friendly platform for investors to participate in Ethereum’s growth without navigating the complexities of blockchain technology. Whether you’re looking for short-term gains or long-term asset appreciation, Ethereum investment with CAP VENTURES offers a strategic way to diversify and strengthen your portfolio.`}
 
             </p>
           </div>
 
           <div>
             <Image 
               src={forexGuy}
               alt="guy with forex currencies"
               className=" w-full object-cover"
             />
           </div>
 
         </div>
       </div>
      
      {/* frequently asked question */}
      <div className="w-full md:w-11/12 lg:w-10/12 mx-auto p-4 sm:p-6 md:py-2 grid grid-cols-1 md:grid-cols-[2fr_2fr]">
        <h2 className=" text-3xl md:text-4xl f text-neutral-800  font-semibold">
          Frequently asked questions
        </h2>
        <AccordionDemo  data={items}/>
      </div>
    </div>
  )
}