import { locations } from './locations';

const LocationItem = ({ name }) => {
    return (
        <div
            className={`map-pointer map-pointer-${name.toLowerCase()}`}
            style={locations[name.toLowerCase()]}
        >
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 36.9 56.7"
                style={{ enableBackground: "new 0 0 36.9 56.7" }}
                xmlSpace="preserve"
            >
                <g>
                    <path
                        className="st0"
                        fill="#FFFFFF"
                        d="M35.9,56.7c-0.5-1.7-1.1-3.4-1.6-5l0.9-0.4c0.6,1.6,1.1,3.3,1.7,5L35.9,56.7z M32.4,46.9 c-0.6-1.6-1.3-3.3-2-4.8l0.9-0.5c0.7,1.6,1.4,3.2,2,4.9L32.4,46.9z M28.2,37.4c-0.8-1.6-1.6-3.1-2.4-4.6l0.9-0.5 c0.8,1.5,1.7,3.1,2.5,4.6L28.2,37.4z M23.1,28.3c-0.9-1.4-1.9-2.9-2.8-4.3l0.8-0.6c1,1.4,2,2.9,2.9,4.4L23.1,28.3z M17.3,19.8 c-1-1.3-2.1-2.7-3.2-4l0.8-0.7c1.1,1.4,2.2,2.7,3.2,4.1L17.3,19.8z M10.7,11.8C9.6,10.6,8.4,9.3,7.2,8l0.7-0.7 c1.2,1.3,2.4,2.6,3.5,3.8L10.7,11.8z M3.7,4.4C2.5,3.2,1.3,2,0,0.8L0.7,0c1.2,1.2,2.5,2.4,3.7,3.6L3.7,4.4z"
                    />
                </g>
            </svg>
            <div className="map-pointer-label">{name}</div>
        </div>
    );
};

export default LocationItem;