import React from 'react';
import { formattedNum } from '../../../utils/helpers';

const FoundryData = ({data}) => {




    return (
        <div className='foundry__data'>

            <div className='foundry__data-item'>
                <main>
                    <p className='foundry__data-item__heading'>Estimated Allocation</p>
                    <div className='foundry__data-item__wrapper'>
                        <div className='foundry__data-item__wrapper__token-data'>
                            <p>USDT</p>
                            <b>{data ? formattedNum( data.usdt) : 0}</b>
                        </div>
                        <div className='foundry__data-item__wrapper__token-data'>
                            <p>WBTC</p>
                            <b>{data ? formattedNum( data.wbtc) : 0}</b>
                        </div>
                    </div>
                </main>

                <svg className='foundry__data-item__icon' width="78" height="78" viewBox="0 0 78 78">
                    <path d="M39 0C43.6946 0 48.1943 0.830533 52.3626 2.34733L47.703 7.003C40.6514 5.08551 33.1637 5.55178 26.4044 8.3293C19.6451 11.1068 13.9929 16.0399 10.3268 22.3615C6.66074 28.6831 5.18616 36.039 6.1324 43.2852C7.07864 50.5314 10.3927 57.2619 15.5591 62.4301C20.7256 67.5983 27.455 70.9146 34.7009 71.8632C41.9468 72.8119 49.3031 71.3398 55.6259 67.6758C61.9488 64.0118 66.8838 58.3613 69.6636 51.6029C72.4433 44.8446 72.9121 37.3571 70.997 30.3047L75.6526 25.6491C77.2099 29.9279 78.0043 34.4467 78 39C78 60.5393 60.5393 78 39 78C17.4607 78 0 60.5393 0 39C0 17.4607 17.4607 0 39 0ZM39 15.6047C40.9756 15.6038 42.9434 15.8527 44.8566 16.3455V22.4556C41.1046 21.1282 37.0127 21.1158 33.2527 22.4204C29.4927 23.725 26.2878 26.2691 24.1643 29.6352C22.0407 33.0012 21.1246 36.9892 21.5663 40.9446C22.0079 44.8999 23.7811 48.5876 26.5949 51.4024C29.4086 54.2171 33.0956 55.9917 37.0508 56.4348C41.006 56.8779 44.9943 55.9632 48.3612 53.8409C51.728 51.7186 54.2733 48.5147 55.5793 44.7551C56.8853 40.9955 56.8743 36.9037 55.5483 33.1512H61.6583C62.8782 37.8755 62.5904 42.863 60.8352 47.4157C59.0801 51.9683 55.9454 55.8583 51.8699 58.5412C47.7945 61.2241 42.9822 62.5656 38.1065 62.378C33.2308 62.1904 28.5358 60.4831 24.6786 57.4951C20.8213 54.507 17.9948 50.3876 16.5946 45.7136C15.1944 41.0395 15.2907 36.0447 16.8699 31.428C18.4491 26.8114 21.4322 22.804 25.4017 19.9667C29.3712 17.1295 34.1285 15.6043 39.0078 15.6047H39ZM46.7984 39C46.7979 40.6761 46.2573 42.3075 45.2569 43.6523C44.2564 44.9971 42.8493 45.9837 41.2441 46.4661C39.6389 46.9484 37.921 46.9007 36.345 46.3301C34.769 45.7594 33.4188 44.6962 32.4945 43.298C31.5702 41.8997 31.121 40.2409 31.2134 38.5674C31.3059 36.8938 31.9351 35.2945 33.0077 34.0066C34.0804 32.7187 35.5395 31.8107 37.1688 31.4171C38.798 31.0235 40.5107 31.1653 42.0531 31.8215L48.7597 25.1149L48.7558 12.6803C48.7565 11.9049 49.0651 11.1616 49.6137 10.6137L59.3617 0.865627C59.7707 0.457159 60.2915 0.179048 60.8585 0.0664218C61.4254 -0.0462047 62.013 0.011704 62.5471 0.232834C63.0811 0.453964 63.5377 0.828397 63.859 1.30884C64.1804 1.78929 64.3522 2.35419 64.3527 2.93221V13.6551H75.0756C75.6536 13.6556 76.2185 13.8274 76.6989 14.1487C77.1794 14.4701 77.5538 14.9267 77.7749 15.4607C77.9961 15.9948 78.054 16.5824 77.9414 17.1493C77.8287 17.7162 77.5506 18.2371 77.1422 18.6461L67.3941 28.3941C66.8462 28.9427 66.1029 29.2513 65.3275 29.2519H52.889L46.1824 35.9586C46.5801 36.8944 46.7984 37.9199 46.7984 39ZM64.1149 23.4031L68.0141 19.5039H61.4244C60.6488 19.5039 59.905 19.1958 59.3565 18.6474C58.8081 18.0989 58.5 17.3551 58.5 16.5795V9.9898L54.6047 13.889V23.1731C54.6872 23.245 54.7653 23.3218 54.8386 23.4031H64.1188H64.1149Z" fill="#1E7559"/>
                </svg>
            </div>

            <div className='foundry__data-item '>
                <main>
                    <p className='foundry__data-item__heading'>Time until next allocate </p>
                    <div className='foundry__data-item__wrapper single-string'>
                        <b style={{fontWeight: 300, color: "#828282"}}>Allocation not started yet</b>
                    </div>
                </main>

                <svg className='foundry__data-item__icon' viewBox="0 0 63 63">
                    <path d="M9.94737 44.7632L0 54.5116V26.5263H9.94737V44.7632ZM26.5263 38.6621L21.3205 34.2189L16.5789 38.5958V13.2632H26.5263V38.6621ZM43.1053 33.1579L33.1579 43.1053V0H43.1053V33.1579ZM52.4226 32.5279L46.4211 26.5263H63V43.1053L57.0647 37.17L33.1579 60.8779L21.6521 50.8642L9.11842 63H0L21.4532 41.9779L33.1579 51.8589" fill="#1E7559"/>
                </svg>
            </div>

            <div className='foundry__data-item'>
                <main>
                    <p className='foundry__data-item__heading'>CNUSD / CNBTC Staked</p>
                    <div className='foundry__data-item__wrapper'>
                        <div className='foundry__data-item__wrapper__token-data'>
                            <p>CNUSD</p>
                            <b>{data ? formattedNum( data.cnusd) : 0}</b>
                        </div>
                        <div className='foundry__data-item__wrapper__token-data'>
                            <p>CNBTC</p>
                            <b>{data ? formattedNum( data.cnbtc) : 0}</b>
                        </div>
                    </div>
                </main>

                <svg className='foundry__data-item__icon' viewBox="0 0 68 68">
                    <path d="M17.0137 34.0212C20.6716 34.0247 24.2308 35.2078 27.1624 37.3948L37.4082 27.1527C35.1946 24.2435 34.0001 20.687 34.0091 17.0319C33.9995 13.2042 35.2833 9.4854 37.6523 6.47822C40.0213 3.47104 43.3368 1.35168 47.0614 0.463607C50.786 -0.424469 54.7014 -0.0292176 58.1732 1.58531C61.645 3.19983 64.4696 5.93901 66.1894 9.35894C67.9091 12.7789 68.4232 16.6791 67.6483 20.4276C66.8734 24.1761 64.8549 27.5532 61.92 30.0116C58.985 32.4699 55.3056 33.8655 51.478 33.9722C47.6504 34.0788 43.8989 32.8902 40.8316 30.5991L30.61 40.8413C32.9014 43.9067 34.0904 47.6556 33.9844 51.4808C33.8785 55.306 32.4838 58.9835 30.0263 61.9174C27.5687 64.8514 24.1923 66.8701 20.4439 67.6466C16.6955 68.423 12.7946 67.9117 9.37318 66.1955C5.95173 64.4793 3.21007 61.6587 1.5923 58.1905C-0.0254745 54.7224 -0.424606 50.8098 0.459549 47.0866C1.3437 43.3634 3.45936 40.0476 6.46383 37.6763C9.4683 35.305 13.1856 34.0171 17.0137 34.0212ZM63.1442 17.0319C63.1442 14.6317 62.4322 12.2855 61.0983 10.2899C59.7644 8.29424 57.8684 6.73883 55.6502 5.82034C53.432 4.90185 50.9911 4.66153 48.6363 5.12978C46.2814 5.59802 44.1183 6.75379 42.4206 8.45094C40.7228 10.1481 39.5666 12.3104 39.0982 14.6644C38.6298 17.0184 38.8702 19.4584 39.789 21.6758C40.7078 23.8933 42.2638 25.7885 44.2602 27.122C46.2565 28.4554 48.6036 29.1671 51.0046 29.1671C54.2242 29.1671 57.312 27.8886 59.5886 25.6128C61.8652 23.337 63.1442 20.2503 63.1442 17.0319Z" fill="#1E7559"/>
                </svg>
            </div>

            <div className='foundry__data-item'>
                <main>
                    <p className='foundry__data-item__heading'>Total Value Locked</p>
                    <div className='foundry__data-item__wrapper'>
                        <b>${data ? formattedNum(data.tvl) : 0}</b>
                    </div>
                </main>
                <svg className='foundry__data-item__icon' viewBox="0 0 64 69">
                    <path d="M57.3275 7.24271L48.2878 15.6753H15.7039L6.66424 7.24271C6.66424 7.24271 11.1668 0.926955 18.5818 0.098446C25.8428 -0.712712 28.3632 3.74996 32.0028 3.93474C35.6302 3.75082 38.1585 -0.712712 45.4099 0.098446C52.8319 0.926087 57.3275 7.24271 57.3275 7.24271ZM33.2466 47.7251V54.0903C34.2099 53.9376 34.9984 53.5654 35.5999 52.9582C36.205 52.3474 36.5096 51.6412 36.5096 50.8292C36.5096 50.1057 36.25 49.4724 35.7436 48.951C35.2356 48.4165 34.4021 48.0166 33.2466 47.7251ZM27.9529 39.5754C27.9529 40.1549 28.1607 40.685 28.5735 41.1795C28.9864 41.6826 29.6113 42.0774 30.4448 42.3836V36.7367C29.6849 36.9476 29.0825 37.3206 28.6341 37.8463C28.1797 38.3712 27.9529 38.9377 27.9529 39.5754ZM62.8089 61.4532C62.8089 61.4532 60.845 69 51.8106 69H12.2037C3.15709 69 1.19406 61.4532 1.19406 61.4532C-4.72188 35.2923 13.2683 21.1053 13.2683 21.1053H50.7347C50.7347 21.1053 68.7153 35.2966 62.8089 61.4532ZM41.2329 50.2445C41.2329 48.4747 40.6772 47.0371 39.552 45.9102C38.432 44.7815 36.3339 43.8697 33.2466 43.1557V36.7836C34.4921 37.2347 35.2633 38.1101 35.5636 39.3862L40.4452 38.8527C40.1085 37.226 39.3339 35.923 38.1325 34.9531C36.9225 33.9832 35.291 33.3923 33.2466 33.1807V31.5618H30.4457V33.1807C28.2334 33.3646 26.4634 34.0664 25.1322 35.2741C23.7966 36.4895 23.1354 37.9851 23.1354 39.7688C23.1354 41.5386 23.7179 43.0256 24.9011 44.2697C26.0773 45.5007 27.9261 46.4212 30.4448 47.0328V53.8613C29.7524 53.5828 29.1206 53.1239 28.5554 52.4958C27.991 51.8581 27.605 51.1068 27.399 50.2445L22.3642 50.6982C22.745 52.841 23.6348 54.4989 25.0266 55.671C26.4158 56.8517 28.2195 57.5484 30.4448 57.7731V60.7427H33.2457V57.6924C35.7549 57.3905 37.7093 56.5602 39.1166 55.2129C40.5292 53.87 41.2329 52.2086 41.2329 50.2445Z" fill="#1E7559"/>
                </svg>
            </div>

        </div>
    )
}

export default FoundryData;