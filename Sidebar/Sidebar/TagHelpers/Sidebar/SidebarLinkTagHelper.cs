using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.Runtime.TagHelpers;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sidebar.TagHelpers.Sidebar
{
    [HtmlTargetElement("sidebar-link")]
    public class SidebarLinkTagHelper : TagHelper
    {
        [HtmlAttributeName("name")]
        public string Name { get; set; }

        [HtmlAttributeName("href")]
        public string Href { get; set; }

        [HtmlAttributeName("asp-controller")]
        public string Controller { get; set; }

        [HtmlAttributeName("asp-action")]
        public string Action { get; set; }

        [HtmlAttributeName("icon-class")]
        public string IconClass { get; set; }

        [HtmlAttributeName("active")]
        public bool Active { get; set; }

        [ViewContext]
        [HtmlAttributeNotBound]
        public ViewContext ViewContext { get; set; }

        private readonly IUrlHelperFactory _urlHelperFactory;
        private readonly IActionContextAccessor _actionContextAccessor;

        public SidebarLinkTagHelper(IUrlHelperFactory urlHelperFactory, IActionContextAccessor actionContextAccessor)
        {
            _urlHelperFactory = urlHelperFactory;
            _actionContextAccessor = actionContextAccessor;
        }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = null;
            output.TagMode = TagMode.SelfClosing;

            var urlHelper = _urlHelperFactory.GetUrlHelper(ViewContext);
            var href = urlHelper.Action(Action, Controller);

            var parent = (SidebarParent)context.Items[SidebarContext.Parent];
            var section = (SidebarSection)context.Items[SidebarContext.Section];

            var controller = ViewContext.RouteData.Values["controller"].ToString();
            var action = ViewContext.RouteData.Values["action"].ToString();

            bool active = false;
            if (Action == action && Controller == controller)
            {
                active = true;
            }

            var link = BuildLink(parent, section, href, active);

            output.Content.AppendHtml(link);
        }

        private string BuildLink(SidebarParent parent, SidebarSection section, string href, bool active)
        {
            if (parent != SidebarParent.Dropdown)
            {
                var rowCollapsable = section == SidebarSection.Content ? "row-collapsable" : "";
                var itemActive = (Active || active) ? "item-active" : "";

                return
                    $"<a class=\"sidebar-row {rowCollapsable}\" href=\"{Href ?? href}\">" +
                        $"<div class=\"sidebar-item {itemActive}\" title=\"{Name}\">" +
                            $"<span class=\"sidebar-icon\"><i class=\"{IconClass}\"></i></span><span class=\"sidebar-text\">{Name}</span>" +
                        "</div>" +
                        "<div class=\"sidebar-item-group\">" +
                            "<div class=\"sidebar-item group-title\">" +
                                $"<span class=\"sidebar-icon\"><i></i></span><span class=\"sidebar-text\">{Name}</span>" +
                            "</div>" +
                        "</div>" +
                    "</a>";
            }
            else
            {
                return
                    $"<a class=\"sidebar-item\" href=\"{Href ?? href}\" title=\"{Name}\">" +
                        $"<span class=\"sidebar-icon\"><i></i></span><span class=\"sidebar-text\">{Name}</span>" +
                    "</a>";
            }
        }
    }
}
