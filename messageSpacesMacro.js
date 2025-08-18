import xapi from 'xapi';

const botToken = "setBotToken"
const deviceId = "setDeviceId"
const spacesUrl = "setCiscoSpacesUrl"

function sendMessage(message) {
  const url = "https://webexapis.com/v1/xapi/command/UserInterface.Message.Alert.Display"
  const authorizationHeader = "Authorization: Bearer " + botToken;
  const contentType = "Content-Type: application/json";
  const body = {
    "deviceId": deviceId,
    "arguments": {
      "Duration": 10,
      "Target": "OSD",
      "Text": "Message from outside room",
      "Title": message
    }
  };

  xapi.command('HttpClient Post', {
    'Header': [authorizationHeader, contentType],
    'Url': url,
    'AllowInsecureHTTPS': 'False'
  }, JSON.stringify(body)).then(
    (result) => {
      console.log("result: " + result)
      xapi.Command.Audio.Sound.Play({Sound: "Alert" });
    })
}

function init() {
  xapi.Config.WebEngine.Features.Peripherals.WebGL.set("On");
  xapi.Config.HttpClient.Mode.set("On");
  setupListerners();
  createPanels();
}

function setupListerners() {
  xapi.event.on('UserInterface Extensions Widget Action', (event) => {
    if (event.WidgetId == 'button1' && event.Type == 'pressed') {
      const message = "Can you pop out?"
      sendMessage(message);
    } else if (event.WidgetId == 'button2' && event.Type == 'pressed') {
      const message = "I have this room booked"
      sendMessage(message);
    } else if (event.WidgetId == 'button3' && event.Type == 'pressed') {
      const message = "Will you be long?"
      sendMessage(message);
    } else if (event.WidgetId == 'button4' && event.Type == 'pressed') {
      const message = "Free coffee out here!"
      sendMessage(message);
    }
  })
}

function createPanels() {
  const messageXml = `
  <Extensions>
  <Version>1.11</Version>
  <Panel>
    <Order>1</Order>
    <Origin>local</Origin>
    <Location>RoomScheduler</Location>
    <Icon>Microphone</Icon>
    <Color>#262626</Color>
    <Name>Message Inside</Name>
    <ActivityType>Custom</ActivityType>
    <Page>
      <Name>Send Message</Name>
      <Row>
        <Name>Send message to</Name>
        <Widget>
          <WidgetId>button1</WidgetId>
          <Name>Can you pop out?</Name>
          <Type>Button</Type>
          <Options>size=2</Options>
        </Widget>
        <Widget>
          <WidgetId>button2</WidgetId>
          <Name>I've this room booked</Name>
          <Type>Button</Type>
          <Options>size=2</Options>
        </Widget>
      </Row>
      <Row>
        <Name/>
        <Widget>
          <WidgetId>button3</WidgetId>
          <Name>Will you be long?</Name>
          <Type>Button</Type>
          <Options>size=2</Options>
        </Widget>
        <Widget>
          <WidgetId>button4</WidgetId>
          <Name>Free coffee out here!</Name>
          <Type>Button</Type>
          <Options>size=2</Options>
        </Widget>
      </Row>
      <Row>
        <Name>Row</Name>
        <Widget>
          <WidgetId>widget_1</WidgetId>
          <Name>The corresponding message will be displayed on the screen inside the meeting room.</Name>
          <Type>Text</Type>
          <Options>size=4;fontSize=small;align=center</Options>
        </Widget>
      </Row>
      <Options>hideRowNames=1</Options>
    </Page>
  </Panel>
</Extensions>
  `
  const spacesXml = `
  <Extensions>
  <Version>1.11</Version>
  <Panel>
    <Order>2</Order>
    <Origin>local</Origin>
    <Location>RoomScheduler</Location>
    <Icon>Custom</Icon>
    <Name>Cisco Spaces</Name>
    <ActivityType>WebApp</ActivityType>
    <ActivityData>${spacesUrl}</ActivityData>
  </Panel>
</Extensions>
  `

  xapi.Command.UserInterface.Extensions.Panel.Save({PanelId: "messagesPanel"}, messageXml);
  xapi.Command.UserInterface.Extensions.Panel.Save({PanelId: "spacesPanel"}, spacesXml);
}

init();
