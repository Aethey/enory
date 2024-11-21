import { FaSun, FaMoon } from 'react-icons/fa'; // 引入图标
import { toggleDarkMode, RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';

const ToggleSwitch = () => {
    const isDarkMode = useSelector((state: RootState) => state.darkMode.isDarkMode);
    const dispatch = useDispatch();

    return (
        <div
            onClick={() => dispatch(toggleDarkMode())} // 点击切换
            className={`relative w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}
        >
            {/* 图标 - 放在滑块外 */}
            <div
                className={`absolute inset-0 flex items-center justify-between px-2 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-500'
                    }`}
            >
                <FaSun size={16} />
                <FaMoon size={16} />
            </div>
            {/* 滑块 */}
            <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-0'
                    }`}
            ></div>
        </div>
    );
};

export default ToggleSwitch;