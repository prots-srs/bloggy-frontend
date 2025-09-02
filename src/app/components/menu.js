'use client'

import { usePathname } from 'next/navigation'
import messages from '@lib/messages';
import PageHeader from "./pageheader";
import Link from 'next/link'

export default function Menu() {
  const items = [
    {
      label: messages.nav['HOME'],
      href: "/",
      page: "HOME"
    },
    {
      label: messages.nav['BLOG'],
      href: "/blog",
      page: "BLOG"
    },
    {
      label: messages.nav['ABOUT'],
      href: "/about",
      page: "ABOUT"
    },
    {
      label: messages.nav['CONTACT'],
      href: "/contact",
      page: "CONTACT"
    }
  ];

  const pathname = usePathname();

  const page = items.find((item) => ((pathname == "/" && item.href == pathname)
    || (item.href != "/" && pathname.includes(item.href))))

  let h1 = "";
  let activePage = "";

  if (page) {
    let pageCode = page.page;
    if (pathname != "/" && pathname != page.href && pathname.includes(page.href)) {
      pageCode = page.page + "_DETAIL";
    }
    h1 = messages.headerPage[pageCode] ? messages.headerPage[pageCode] : "";
    activePage = page.href;
  }

  return (
    <>
      <div className="container p-0">
        <nav className="navbar navbar-expand-lg bg-secondary navbar-dark">
          <a href="" className="navbar-brand d-block d-lg-none"></a>
          <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
            <div className="navbar-nav m-auto">
              {items.map((item) => (
                <Link key={item.href} href={item.href} className={`nav-item nav-link ${item.href === activePage ? 'active' : ''}`}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
      {pathname != "/" && <PageHeader title={h1} />}
    </>
  );
}
