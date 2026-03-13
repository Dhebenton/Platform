import { useEffect, useState } from 'react'
import { Chevron } from '../../../assets/Icons'
import './AccountDropdown.css'
import { supabase } from '../../../lib/supabase'

export default function AccountDropdown() {
     const [profile, setProfile] = useState(null)

     useEffect(() => {
          async function fetchProfile() {
               const { data: { user } } = await supabase.auth.getUser()
               if (!user) return

               const { data } = await supabase
                    .from('profiles')
                    .select('first_name, last_name, avatar_url')
                    .eq('id', user.id)
                    .single()

               setProfile(data)
          }

          fetchProfile()
     }, [])

     const fullName = profile ? `${profile.first_name} ${profile.last_name}` : ''
     const avatar = profile?.avatar_url ?? null

     // TODO: LOADING STATE

     return (
          <button className="account-dropdown-toggle not-ready font13 w540 f-row g8">
               {avatar
                    ? <img src={avatar} />
                    : <div className="avatar-placeholder" />
               }
               <p>{fullName}</p>
               <Chevron />
          </button>
     )
}