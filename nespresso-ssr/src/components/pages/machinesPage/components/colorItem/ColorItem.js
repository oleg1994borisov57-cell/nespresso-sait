import { Color } from "./styles";



export default function ColorItem({isActive, hex, onClick}) {
    return (
        <Color onClick={onClick} sx={{
            background: hex
        }} className={isActive ? 'current' : null} />
    )
}