import React from 'react'
import Link from 'next/link'

export default () => (
  <ul>
    <li><Link href='/b' as='/a'><a>a</a></Link></li>
    <li><Link href='/a' as='/b'><a>b</a></Link></li>
    <li><Link href='/posts/2'><a>post #2</a></Link></li>
  </ul>
)
