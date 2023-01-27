export default class Util {
    static childWhere = (htmlcollection, filter) => {
        for (const child of htmlcollection) {
            if (filter(child)) return child
        }
        return null
    }
}
