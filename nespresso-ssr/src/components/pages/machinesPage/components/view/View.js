export default function View() {
    return (
        <div
            id="enriched_switch"
            style={{ margin: "0", padding: "0" }}
            className="p5"
        >
            <div className={"enriched_switch selected"} data-view="grid">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    width={16}
                    height={16}
                    id="filters_datalayout_grids"
                >
                    <path d="M0 20V0h20v20H0zm1-1h8.5v-9H1v9zm18-9h-8.5v9H19v-9zM1 9h8.5V1H1v8zm18-8h-8.5v8H19V1z" />
                </svg>
                <span>Сетка</span>
            </div>
            <div className={"enriched_switch"} data-view="list">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 21 18"
                    width={16}
                    height={16}
                    id="filters_datalayout_rows"
                    className=""
                >
                    <path
                        xmlns="http://www.w3.org/2000/svg"
                        d="M2.5 13.5c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm18 1.5v1H6.76557434v-1H20.5zm-18-8c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm18 1.5v1H6.76557434v-1H20.5zm-18-8c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm18 1.5v1H6.76557434V2H20.5z"
                    />
                </svg>
                <span>Список</span>
            </div>
        </div>
    );
}
