const synth = window.speechSynthesis;

export type IVoiceConfig = Pick<SpeechSynthesisUtterance, 'voice' | 'pitch' | 'rate'>

/** 语音列表 */
let voicesList: SpeechSynthesisVoice[] = synth.getVoices();
/** 语音类型 */
let voiceType = {} as SpeechSynthesisVoice
/** 语音设置 */
let voiceConfig = {} as IVoiceConfig
let voiceUnit = {} as SpeechSynthesisUtterance

/** 设置语音类型 */
function setVoiceType (voice: SpeechSynthesisVoice) {
  voiceType = {...voiceType, ...voice}
}

/** 设置语音属性 */
function setVoiceConfig (config: IVoiceConfig) {
  voiceConfig = {...voiceConfig, ...config}
}

/** 发声 */
function start (content?: string) {
  console.log('----- start speech!!')
  if (!content) {
    synth.resume()
    return
  }
    
  voiceUnit = new SpeechSynthesisUtterance(content)
  synth.speak(voiceUnit);
  synth.pause()
  synth.resume()
 
}

function stop () {
  console.log('-----stop speech!!')
  synth.pause()
  synth.cancel()
}

export default {
  voicesList,
  setVoiceType,
  setVoiceConfig,
  start,
  stop
}