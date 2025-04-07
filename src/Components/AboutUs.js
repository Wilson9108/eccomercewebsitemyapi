
import { useEffect } from 'react'
import style from '../cssFiles/aboutus.module.css'
import {teamData} from '../TeamData/Team.js'

export default function About(){
    // console.log(teamData)
    useEffect(()=>{
    let content = document.querySelector('#content')
    console.log(content)
   
    },[])
    return(
        <>
        <div className={`${style.aboutUsContainer}`}>
            <div className={`${style.aboutUsHeaderContainer}`}>
                <div className={`${style.header}`}>
                    <h1>About Us</h1>
                </div>
                <div className={`${style.headerImg}`}></div>
            </div>
            <div className={`${style.aboutUsBox}`}>
                <div className={`${style.aboutContent}`}>
                    <h1>About Us</h1>
                    <p id={`${style.content}`}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                    </p>
                </div>
                <div className={`${style.aboutImg}`}></div>
            </div>
            <div className={`${style.ourTeamContainer}`}>
                <h6 className={`${style.ourTeamHeadingOne}`} >A Few Words About</h6>
                <h1 className={`${style.ourTeamHeadingTwo}`}>Our Team</h1>
                <p className={`${style.ourTeamHeadingThree} `}>Lorem ipsum dolor sit amet, consectetur labore et dolore magna aliqua. Ut enim ad minim </p>
                <div className={`${style.ourTeamProfiles}`}>
                    {teamData.map(data=>(
                    <div className={`${style.profileOne}`}>
                        <img src={data.img} className={`${style.img}`}></img>
                        <div className={`${style.Name}`}><h3>{data.name}</h3></div>
                        <div className={`${style.designation}`}><h6>{data.designation}</h6></div>
                    </div>
                    ))}
                </div>
            </div>
            <div className={`${style.aboutusEndingContainer} mt-5`}>
                <div className={`${style.aboutusEndingBox}`}>
                    <div className={`${style.endingImgOne}`}></div>
                    <div className={`${style.followUsCard}`}>
                        <div className={`${style.followUsHeadingContainer}`}>
                        <h1 className={`${style.followUsHeading}`}>Follow Us</h1>
                        </div>
                        <div className={`${style.followUsIconContainer}`}>
                        <i class="fa-brands fa-facebook"></i>
                        <i class="fa-brands fa-twitter"></i>
                        <i class="fa-brands fa-instagram"></i>
                        </div>
                        
                    </div>
                    <div className={`${style.endingImgTwo}`}></div>
                </div>
            </div>
        </div>
        </>
    )
}