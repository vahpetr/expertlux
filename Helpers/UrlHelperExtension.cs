// using System;
// using Microsoft.AspNet.Http;
// using Microsoft.AspNet.Mvc;

// namespace expertlux.Helpers
// {
//     public static class UrlHelperExtension
//     {
//         private static IHttpContextAccessor HttpContextAccessor;
//         public static void Configure(IHttpContextAccessor httpContextAccessor)
//         {
//             HttpContextAccessor = httpContextAccessor;
//         }

//         public static string Absolute(
//             this IUrlHelper urlHelper,
//             string url)
//         {
//             // string scheme = HttpContextAccessor.HttpContext.Request.Scheme;
//             // return url.Action(actionName, controllerName, routeValues, scheme);
//             var path = urlHelper.Content(url);
//             var uri = new Uri(path);
//             return uri.AbsoluteUri;
//         }
//     }
// }