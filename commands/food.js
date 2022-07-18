import axios from 'axios'

export default async (event) => {
  try {
    const { data } = await axios.get('https://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvTravelFood.aspx')
    const idx = data.findIndex(item => item.Name === event.message.text.slice(3))
    if (idx > -1) {
      event.reply([
        {
          type: 'image',
          originalContentUrl: data[idx].PicURL,
          previewImageUrl: data[idx].PicURL
        },
        {
          type: 'location',
          title: data[idx].Name,
          address: data[idx].Address,
          latitude: data[idx].Latitude,
          longitude: data[idx].Longitude
        },
        {
          type: 'text',
          text: data[idx].HostWords
        }
      ])
    } else {
      event.reply('抱歉 找不到~')
    }
  } catch (error) {
    event.reply('發生錯誤')
  }
}
