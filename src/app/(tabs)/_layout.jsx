import { NativeTabs } from "expo-router/native-tabs";

export default function Layout() {
    return (
        <NativeTabs>
            <NativeTabs.Trigger name="index">
                <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="favorites">
                <NativeTabs.Trigger.Label>Favorites</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf="star.fill" md="star" />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="bookings">
                <NativeTabs.Trigger.Label>Bookings</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf="calendar.circle.fill" md="person" />
            </NativeTabs.Trigger>
        </NativeTabs>
    )
}