import React from 'react';
import shallow from 'zustand/shallow';
import {
    Slider,
    ToggleSwitch,
    SwitchOption,
    DarkModeSelector,
    StyledSettingsPopout,
} from '~/components/Nav/Navbar/Popouts/styles';
import { useStore } from '~/store/main';
import { selectThemeSlice } from '~/store/ThemeSlice';

const SettingsPopout: React.FC<{ isActive: boolean }> = ({ isActive }) => {
    const { isDark, toggleTheme } = useStore(selectThemeSlice, shallow);

    return (
        <StyledSettingsPopout isActive={isActive}>
            <DarkModeSelector>
                <span>Dark Mode</span>
                <ToggleSwitch onClick={toggleTheme}>
                    <SwitchOption selected={!isDark}>Off</SwitchOption>
                    <SwitchOption selected={isDark}>On</SwitchOption>
                    <Slider isSwitchedOn={isDark} />
                </ToggleSwitch>
            </DarkModeSelector>
        </StyledSettingsPopout>
    );
};

export default SettingsPopout;
