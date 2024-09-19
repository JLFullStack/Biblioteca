using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sidebar.TagHelpers.Sidebar
{
    enum SidebarContext
    {
        Parent,
        Section,
    }

    enum SidebarParent
    {
        Root,
        Content,
        Footer,
        Dropdown,
    }

    enum SidebarSection
    {
        Content,
        Footer,
    }
}
