export const PRE_PRIMER = [
  'a','and','away','big','blue','can','come','down','find','for',
  'funny','go','help','here','I','in','is','it','jump','little',
  'look','make','me','my','not','one','play','red','run','said',
  'see','the','three','to','two','up','we','where','yellow','you'
]

export const PRIMER = [
  'all','am','are','at','ate','be','black','brown','but','came',
  'did','do','eat','four','get','good','have','he','into','like',
  'must','new','no','now','on','our','out','please','pretty','ran',
  'ride','saw','say','she','so','soon','that','there','they','this',
  'too','under','want','was','well','went','what','white','who','will',
  'with','yes'
]

export const GRADE_1 = [
  'after','again','an','any','as','ask','by','could','every','fly',
  'from','give','going','had','has','her','him','his','how','just',
  'know','let','live','may','of','old','once','open','over','put',
  'round','some','stop','take','thank','them','think','walk','were','when'
]

export const GRADE_2 = [
  'always','around','because','been','before','best','both','buy','call','cold',
  'does','don\'t','fast','first','five','found','gave','goes','green','its',
  'made','many','off','or','pull','read','right','sing','sit','sleep',
  'tell','their','these','those','upon','us','use','very','wash','which',
  'why','wish','work','would','write','your'
]

export const ALL_DOLCH = [...PRE_PRIMER, ...PRIMER, ...GRADE_1, ...GRADE_2]

export const SIGHT_WORD_GROUPS = {
  'Pre-Primer': PRE_PRIMER,
  'Primer': PRIMER,
  'Grade 1': GRADE_1,
  'Grade 2': GRADE_2,
}
