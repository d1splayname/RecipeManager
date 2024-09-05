import java.util.Date;

/**
 *
 */
public class Recipe {
    private String name;

    private String url;
    private String comment;
    private Date lastOpened;
    private Date dateAdded;

    public Recipe(String url) {
        this.url = url;
    }

    public Recipe(String name, String url) {
        this.name = name;
        this.url = url;
    }

    public Recipe(String name, String url, String comment) {
        this.name = name;
        this.url = url;
        this.comment = comment;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Date getLastOpened() {
        return lastOpened;
    }

    public void setLastOpened(Date lastOpened) {
        this.lastOpened = lastOpened;
    }

    public Date getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(Date dateAdded) {
        this.dateAdded = dateAdded;
    }
}
