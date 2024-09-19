using Microsoft.AspNetCore.Razor.Runtime.TagHelpers;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sidebar.TagHelpers.Sidebar
{
    [HtmlTargetElement("sidebar-dropdown")]
    [RestrictChildren("sidebar-link", "sidebar-dropdown")]
    public class SidebarDropdownTagHelper : TagHelper
    {
        [HtmlAttributeName("name")]
        public string Name { get; set; }

        [HtmlAttributeName("icon-class")]
        public string IconClass { get; set; }

        public override void Init(TagHelperContext context)
        {
            context.Items[SidebarContext.Parent] = SidebarParent.Dropdown;
        }

        public async override void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = null;

            var parent = (SidebarParent)context.Items[SidebarContext.Parent];
            var section = (SidebarSection)context.Items[SidebarContext.Section];

            var children = await output.GetChildContentAsync();

            var dropdown = BuildDropdown(parent, section, children.GetContent());

            output.Content.AppendHtml(dropdown);
        }

        private string BuildDropdown(SidebarParent parent, SidebarSection section, string children)
        {
            var rowCollapsable = section == SidebarSection.Content ? "row-collapsable" : "";

            return
                $"<div class=\"sidebar-row sidebar-row-dropdown {rowCollapsable}\">" +
                    $"<div class=\"sidebar-item\" title=\"{Name}\">" +
                        $"<span class=\"sidebar-icon\"><i class=\"{IconClass}\"></i></span><span class=\"sidebar-text\">{Name}</span>" +
                    "</div>" +
                    "<div class=\"sidebar-item-group\">" +
                        "<div class=\"sidebar-item group-title\">" +
                            $"<span class=\"sidebar-icon\"><i></i></span><span class=\"sidebar-text\">{Name}</span>" +
                        "</div>" +
                        children +
                    "</div>" +
                "</div>";
        }
    }
}
