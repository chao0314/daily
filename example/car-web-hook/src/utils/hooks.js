import React, {useEffect} from "react";
import {useLocation} from 'react-router-dom';

export const useMoveToAnchor = (anchor) => {
    const {hash} = useLocation();
    if (!anchor) {
        anchor = hash;
    }
    if (!anchor || anchor === '#') {
        document.documentElement.scrollIntoView();
    } else {
        let el = document.querySelector(anchor);
        if (el) el.scrollIntoView();
    }


}

export const useQuery =  ()=> new URLSearchParams(useLocation().search);