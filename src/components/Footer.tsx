import React from "react";

const Footer = () => {
    return (
        <footer className="w-full border-t border-[#E1E8E1] bg-[#FAFCFA]">
            <div className="mx-auto flex min-h-[68px] w-full max-w-6xl flex-col items-start justify-between gap-3 px-4 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-6 lg:px-8">
                
                {/* Left */}
                <p className="text-sm leading-5 text-[#1D271F]">
                    বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>

                {/* Right */}
                <p className="text-right text-sm leading-5 text-[#1D271F]">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </p>

            </div>
        </footer>
    );
};

export default Footer;