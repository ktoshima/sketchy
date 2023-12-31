import { SessionContext } from "../context/SessionContext";
import { useContext } from "react";

export const useSessionContext = () => {
	const context = useContext(SessionContext);

	if (!context) {
		throw Error('useSessionContext must be used inside an SessionContextProvider')
	}

	return context;
}
