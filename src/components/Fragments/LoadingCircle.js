import '../../assets/css/LoadingCircle.css';
/** 
 *  :: CAUTION ::
 * Experimental component 
 * For loading animaton (circle animation)
 */
export default function LoadingCircle() {
    return (
        <>
            <svg viewBox="0 0 60 60" className="sampleSVG">
                <circle
                    cx="30"
                    cy="30"
                    r="12.5"
                />
            </svg>
        </>
    )
}