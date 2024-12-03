import { useEffect, useRef } from "react";

function useOutsideClick(handler, capture = true, el) {
   
    const ref = useRef();
    
    useEffect(() => {
        const handleClick = (e) => {
            let btn;
            if(el) {
                btn = e.target.closest(`.${el.className.split(" ")[0]}`);
            }
            if (!ref.current || btn) return;
            // console.log(e.target);
            // console.log(ref.current);
            // console.log(ref.current.contains(e.target));
            if (ref.current && !ref.current.contains(e.target)) {
                // console.log(`its fuckin work now!!! I'm close this shit`);
                handler();
            }
        };

        document.addEventListener("click", handleClick, capture);

        return () => document.removeEventListener("click", handleClick, capture);
    }, [handler]);

    return ref;
}

export default useOutsideClick;
