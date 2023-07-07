import "./portfolio.css"
import SimpleImageSlider from "react-simple-image-slider";
import { FloatingOverlay } from "@floating-ui/react";
import { useState , useEffect} from "react";
import { useDispatch } from "react-redux";
import { deletePortfoliosById } from "../../../actions/portfolios";
import { useLocation } from "react-router-dom";

export default function Portfolio({portfolio}) {

  const [overlayState,setOverlayState] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  

  const handelOverlayClick = ()=>{
    setOverlayState(!overlayState);
  }

  const handelDelete = (e) => {
    e.preventDefault();
    dispatch(deletePortfoliosById(portfolio?.id,portfolio?.photographerId));
    
  }

  return (
    <div className="portfolio">
      <div className="portfolioContainer">
        <div className="portfolioImg">
          {!overlayState? 
            <div>
              <SimpleImageSlider
                onClick={handelOverlayClick}
                width={150}
                height={200}
                images={portfolio?.sourceUrls}
                showNavs={true}
                navSize={20}
                navStyle={2}
                navMargin={20}
                useGPURender={true}
              />
            </div>
            
            :

            <FloatingOverlay style={{display:"grid", zIndex:1, placeItems: "center", background: "rgba(25, 25, 25, 0.8) "}}>
              <div className={"overlayBtn"}>
                <button onClick={handelOverlayClick}>x</button>
              </div>
              <div >
                <SimpleImageSlider
                  onClick={handelOverlayClick}
                  width={400}
                  height={600}
                  images={portfolio?.sourceUrls}
                  showBullets={true}
                  showNavs={true}
                />
              </div>
            </FloatingOverlay>
          }
        </div>  
        
       
        {/* <img src="https://images.unsplash.com/photo-1563808599481-34a342e44508?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" className="portfolioImg" alt="" /> */}
        <div className="portfolioInfo">
          <div className="portfolioNames">
              <span className="portfolioName">{portfolio.albumName}</span>
          </div>
          <span className="portfolioLocation">
              @{portfolio.location}
          </span>
        </div>
      </div>

        
    <div className="portfolioDel">
        { location.pathname.includes('portfolio') &&  <button onClick={handelDelete} type="submit" className="portfolioDelBtn">Delete</button>}
        
    </div>
    </div>
    
  );
}
