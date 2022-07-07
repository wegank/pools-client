import React, { useEffect, useRef } from 'react';
import { Container } from '../General/Container';
import HelpIconSVG from '/public/img/general/help.svg';

const Footer: React.FC<{
    setShowOnboardModal?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowOnboardModal }) => {
    const yearRef = useRef<HTMLSpanElement>(null);
    const setCopyrightYear = () => {
        (yearRef.current as HTMLSpanElement).innerText = new Date().getFullYear().toString();
    };

    useEffect(() => {
        setCopyrightYear();
    }, []);

    return (
        <footer>
            <Container className={'mt-auto'}>
                <hr className="border-t-[0.5px] border-tracer-650 dark:border-white" />
                <div className="flex flex-col-reverse justify-between py-6 font-aileron text-tracer-650 dark:text-white md:px-0 xl:flex-row">
                    <div className="flex flex-col-reverse items-center justify-between xl:justify-start xs:flex-row">
                        <span className="whitespace-nowrap text-sm leading-[21px]">
                            &copy; <span ref={yearRef} /> Pong Finance
                        </span>
                    </div>
                    <div className="mb-8 flex flex-col items-center justify-between md:mb-10 xl:mb-0 xl:items-center xl:justify-start xs:flex-row xs:items-start">
                        {setShowOnboardModal && <HelpIcon setShowOnboardModal={setShowOnboardModal} />}
                    </div>
                </div>
            </Container>
        </footer>
    );
};

const HelpIcon: React.FC<{
    setShowOnboardModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowOnboardModal }) => {
    return (
        <button
            className="xs:ml-10"
            // className="fixed bottom-5 right-5 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-tracer-500 lg:right-8 lg:bottom-8"
            onClick={() => {
                setShowOnboardModal(true);
            }}
        >
            <HelpIconSVG />
        </button>
    );
};

export default Footer;
