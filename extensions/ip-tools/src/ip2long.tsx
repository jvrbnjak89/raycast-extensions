import { IPv4, IPv6 } from "ip-toolkit";
import { useState } from "react";
import { List, Icon, Color, Action, ActionPanel } from "@raycast/api";
import { drinkTypes, DrinkDropdown } from "./components/dropdown";

export default function Command(props: { arguments: { keywork: string } }) {
  const { keywork } = props.arguments;
  const [version, setVersion] = useState<string>("IPv4");
  const [searchText, setSearchText] = useState<string>(keywork ? keywork : "");

  const isEmpty = searchText.trim() === "";
  const isValid = isEmpty ? false : version === "IPv4" ? IPv4.isValidIP(searchText) : IPv6.isValidIP(searchText);
  const convertResult = isValid
    ? (version === "IPv4" ? IPv4.ip2long(searchText) : IPv6.ip2long(searchText)).toString()
    : "";

  return (
    <List
      throttle={true}
      searchText={searchText}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder="Input IP address that needs to be converted！"
      searchBarAccessory={<DrinkDropdown drinkTypes={drinkTypes} onDrinkTypeChange={setVersion} />}
    >
      {isEmpty ? (
        <List.EmptyView
          icon={{ source: Icon.Warning, tintColor: Color.Yellow }}
          title="Please enter the IP address that needs to be converted！"
        />
      ) : !isValid ? (
        <List.EmptyView
          icon={{ source: Icon.XMarkCircle, tintColor: Color.Red }}
          title="Please enter a valid IP address！"
        />
      ) : (
        <List.Item
          icon={Icon.Clipboard}
          title={convertResult}
          subtitle={searchText}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard content={convertResult} />
            </ActionPanel>
          }
        />
      )}
    </List>
  );
}
