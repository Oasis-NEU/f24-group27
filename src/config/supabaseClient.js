
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = proces.env.REACT_APP_SUPABASE_UR
const supabaseKey = process.env.REACT_APP_ANNON_KEY 

const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase